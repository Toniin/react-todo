const Button = ({textContent, action}: {textContent: string, action: () => void}) => {
  return (
    <button onClick={action}>{textContent}</button>
  )
}

export default Button