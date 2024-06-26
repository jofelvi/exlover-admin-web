import useAuth from '../../Auth/hooks/useAuth.tsx'
import LayoutMainPrivate from './LayoutPrivate.tsx'
import LayoutPublic from './LayoutPublic.tsx'

const Layout = () => {
  const { isAuth } = useAuth()

  return isAuth ? <LayoutMainPrivate /> : <LayoutPublic />
}

export default Layout
