import logo from '../assets/logo.svg'

const Header = () => (
  <div className='w-full h-[60px] py-[10px] bg-[#1b1b1b]'>
    <img src={logo} alt='logo' className='w-[200px] h-[40px] mr-auto' />
  </div>
)

export default Header