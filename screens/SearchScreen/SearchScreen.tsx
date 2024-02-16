import { useEffect, useState } from "react"
import { View, Text, SafeAreaView, TextInput, StyleSheet, ActivityIndicator } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import useAppStore from '../../lib/store'
import MediaList from "../../components/MediaList/MediaList"
import { MovieResult, TvResult } from "../../lib/OverseerrClient"
import { MediaType } from "../../lib/types"

function SearchScreen(): JSX.Element {
	const [searchString, setSearchString] = useState('')
	const [searchValue] = useDebounce(searchString, 1000)
	const navigation = useNavigation()
	const { client } = useAppStore()

	console.log('searchValue', searchValue)

	const queryClient = useQueryClient()
	const {
		fetchNextPage,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ['search', searchValue],
		queryFn: ({ pageParam }) => client?.search.getSearch(searchValue, pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage: any) => {
			if (lastPage?.page && lastPage?.totalPages && lastPage.page < lastPage.totalPages) {
				return lastPage.page + 1
			}
			return undefined
		},
		enabled: searchValue ? true: false
	})

	useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['search'] })
    }
  }, [])

	const handlePressMedia = (item: MovieResult | TvResult) => {
		if (item.mediaType === MediaType.movie) {
			// @ts-ignore
			navigation.navigate('Movie', { item })
		} else {
			navigation.navigate('Tv', { item })
		}
	}

	const header = (
		<TextInput
			value={searchString}
			onChangeText={setSearchString}
			style={style.input}
			placeholder={'Search'}
		/>
	)

	const media = data?.pages ? data?.pages.map((page) => page?.results).flat() : []

	console.log('isFetching', isFetching)

	return (
		<SafeAreaView>
			<MediaList
				header={header}
				media={media}
				onPress={handlePressMedia}
				onEndReached={fetchNextPage}
			/>
			{isFetching &&
				<ActivityIndicator size="large" style={{ paddingTop: 30 }} />
			}
		</SafeAreaView>
	)
}

const style = StyleSheet.create({
	input: {
		marginTop: 50,
		marginBottom: 50,
		fontSize: 38,
		height: 80,
		borderRadius: 10,
		backgroundColor: '#DDDDDD'
	}
})

export default SearchScreen
