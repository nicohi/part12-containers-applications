interface Props {
    message: string;
}

const Notification = ({ message } : Props) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === '') {
    return null
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )

}

export default Notification
