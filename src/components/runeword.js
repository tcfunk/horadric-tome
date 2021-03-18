import * as React from "react"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

import GridItem from '../components/style-elements/grid-item'


export default function Runeword(props) {
  const [isOpen, setOpen] = React.useState(false)
  const stats = documentToHtmlString(JSON.parse(props.stats))
  const runes = props.runes.map((rune) => rune.title).join(' + ')
  const itemTypes = props.itemTypes?.join('/')

  return (
    <GridItem onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className="group">
      <p className="text-yellow-300 text-2xl">{props.title}</p>
      <p className="text-gray-200 text-md">{props.sockets} Socket {itemTypes}</p>
      <p className="text-yellow-300 text-lg">{runes}</p>

      {props.children}

      {isOpen && <div className="absolute w-full left-0 bg-gray-800 p-4 rounded-b border-r-2 border-b-2 border-l-2">
        <p className="text-blue-400 whitespace-pre-line" dangerouslySetInnerHTML={{__html: stats}}></p>
      </div>}
    </GridItem>
  )
}
