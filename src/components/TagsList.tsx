import { Collapse } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { TagData, PathData } from '../types'
import Endpoint from './Endpoint'
import { useNavigate } from 'react-router-dom'
import useKeyPressHook from '../utils/useKeyPressHook'

interface TagsListProps {
  tags: TagData[]
  paths: PathData
}

const TagsList = (props: TagsListProps) => {
  useEffect(() => {
    const scrollToInterval = setTimeout(() => {
      const hash = window.location.hash
      const tag = hash.split('/')[1]
      const endpoint = hash.split('/')[2]
      if (tag) {
        const el = document.getElementById(endpoint ? `${tag}/${endpoint}` : tag)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth'})
        }
      }
    }, 500)
    return () => clearTimeout(scrollToInterval)
  }, [])

  return (
    <div className='flex flex-col gap-1 max-w-[1468px] mx-auto my-[50px] w-full' data-cy='tags-list'>
      {props.tags.map((tag: TagData, i: number) => (
        <TagItem key={tag.name + i} tag={tag} paths={props.paths}/>
      ))}
    </div>
  )
}

interface TagItemProps {
  tag: TagData
  paths: PathData
}

const TagItem = (props: TagItemProps) => {
  const [open, setOpen] = useState(true)
  const [paths, setPaths] = useState<PathData>({} as PathData)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const paths = Object.keys(props.paths).reduce((acc: PathData, path: string) => {
      const methods = Object.keys(props.paths[path])
      methods.forEach((method: string) => {
        if (props.paths[path][method].tags.includes(props.tag.name)) {
          acc[path] = {
            [method]: props.paths[path][method],
            ...acc[path]
          }
        }
      })
      return acc
    }, {})
    setPaths(paths)
  }, [props.paths])
  
  const handleOpen = () => {
    navigate(!open ? `/#/${props.tag.name}` : '/#/', { replace: true })
    setOpen(!open)
  }
  useKeyPressHook(['Enter'], handleOpen, ref)

  return (
    <div className='flex flex-col' data-cy='tag-item'>
      <div
        className='flex items-center gap-4 cursor-pointer p-[10px] hover:bg-hover border-b-[1px] border-gray-400'
        onClick={handleOpen}
        tabIndex={0}
        id={props.tag.name}
        ref={ref}
      >
        <div className='font-bold text-2xl'>{props.tag.name}</div>
        <p className='text-base'>{props.tag.description}</p>
        <KeyboardArrowDownIcon className={`transform ${open ? 'rotate-180' : ''} ml-auto`} />
      </div>
      <Collapse className='p-[10px]' in={open}>
        {Object.keys(paths).map((path: string, i: number) => {
          const methods = Object.keys(paths[path])
          return (
            <React.Fragment key={path + i}>
              {methods.map((method) => (
                <Endpoint key={method + path} path={path} method={method} data={paths[path][method]}/>
              ))}
            </React.Fragment>
          )
        })}
      </Collapse>
    </div>
  )
}

export default TagsList