import React from 'react'
import Hero from '../components/Hero'
import Specials from '../components/Specials'
import MenuGrid from '../components/MenuGrid'


export default function Home({ addToCart }){
return (
<div>
<Hero />
<Specials addToCart={addToCart} />
<MenuGrid addToCart={addToCart} />
</div>
)
}