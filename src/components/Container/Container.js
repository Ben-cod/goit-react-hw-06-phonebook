
import css from './Container.module.css'


export const Container = ({children}) => {
    return (
        <div className={css.container}>
            <h1 className={css.title}>Phonebook</h1>
            {children}
        </div>
    )
}