import { Link } from 'react-router-dom'
interface estherscanProps {
  address: string | undefined,
  className: string
}
function EstherscanComponent({ address, className }: estherscanProps) {
  return (
    <>
      <Link to={`https://sepolia.etherscan.io/address/${address}`}>
        <span className={className}>
          {address ? address.substring(0, 4) + '...' + address.substring(address.length - 4) : ''}
        </span>
      </Link>
    </>
  )
}

export default EstherscanComponent