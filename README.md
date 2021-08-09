what I have learned from react query:
-A query is a request for data or information from a database table or combination of table
-3.concepts: queries,mutations, query invalidation
-all that matters to react query are asynchrous operations
-znaci to je sve za fethcanje date i takovih stvari
-useQuery() -- prvi arg je samo string ca fetchas ili ca god
a drugi je fetch function(getting data ili throwing error - samo da returna promise)
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA useQuery returna status, loading i sve to
-server side je pa ne rabi se ucitavati svaki put i guess
so we don't use global state manager aka mobx, za fetchanje date s useQuery-on?

trect arg za useQuery = > neki objektic,{ initialData: ()=>{
queryCache--(to je kadi se stora sva data).getQueryData("key")?
}}
ima jos i initialStale: true
devtools je dosta KUL

useMutation prvi arg je ufnc koja radi mutaciju npr. imas naslov i promjenis ga pa moras opet fetchati
invalidateQueries(key)
mutacije su kool
isFetching je kao boolje koristiti umisto isLoading i guess
postoji i useIsFetching hook
yee i got bored na 1:05 tako da YES

https://www.youtube.com/watch?v=DocXo3gqGdI&t=426s pogledaj to i generic funciton types typescript ujutro prvo
