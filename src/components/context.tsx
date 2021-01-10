import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { Cart } from '../../types/Cart'

const defaultState: AppState = {
  setCart: () => {},
  cart: undefined,
}

const AppContext = createContext(defaultState)

const AppProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<AppState['cart']>(defaultState.cart)

  return (
    <AppContext.Provider value={{ cart, setCart }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppState = () => useContext(AppContext)

type AppState = {
  cart?: Cart
  setCart: Dispatch<SetStateAction<Cart | undefined>>
}

export { AppProvider, useAppState }
