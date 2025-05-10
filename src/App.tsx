import { Provider } from 'react-redux'
import { store } from './redux/store'
import { SidebarProvider } from './contexts/SidebarContext'
import { LoadingProvider } from './contexts/LoadingContext'
import useRouteElement from './hooks/useRouteElement'
import './index.css'

function App() {
  const routeElement = useRouteElement()

  return (
    <Provider store={store}>
      <SidebarProvider>
        <LoadingProvider>
          {routeElement}
        </LoadingProvider>
      </SidebarProvider>
    </Provider>
  )
}

export default App
