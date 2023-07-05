import { fromEvent, EMPTY } from 'rxjs'
import {map, debounceTime, tap, distinctUntilChanged, switchMap, catchError, filter, mergeMap} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'
import css from './styles.css'

const url = ' https://api.github.com/search/users?q='
const input = document.querySelector('.input')
const result = document.querySelector('.result-container')

const stream$ = fromEvent(input, 'input').pipe(
    map(value => value.target.value),
    debounceTime(1000),
    distinctUntilChanged(),
    filter(v => v.trim()),
    switchMap(value => ajax.getJSON(url + value).pipe(
        catchError(() => EMPTY)
    )),
    map(items => items.items),
    mergeMap(item => item)
)

stream$.subscribe(value => {
    result.innerHTML += value.login
})
