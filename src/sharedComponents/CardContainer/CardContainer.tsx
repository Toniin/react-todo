import {ReactNode} from 'react'

const CardContainer = ({children}: { children: ReactNode }) => {
    return (
        <main className="card-container">
            <h1>React To-Do List</h1>
            <div className="card-content">
                {children}
            </div>
        </main>
    )
}

export default CardContainer