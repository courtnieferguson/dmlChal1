// Import deps
import React from 'react'
import { render } from 'react-dom'

// Import components
import { Movies } from './components/movies'

// Import styles
import './styles/styles.css'

// Find div container
const rootElement = document.getElementById('root')

// Render Movies component in the DOM
render(<Movies />, rootElement)
