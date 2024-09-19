import {ReactNode} from "react";

const ButtonIcon = ({icon, action}: {icon: ReactNode, action: () => void}) => {
    return (
        <button onClick={action}>{icon}</button>
    )
}

export default ButtonIcon