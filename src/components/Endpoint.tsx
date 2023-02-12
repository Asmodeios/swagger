import { Collapse } from '@mui/material'
import { useState, useEffect, useRef, } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ParametersData, ResponsesData, MethodData } from '../types'
import { Table, TableData } from './Table'
import { useNavigate } from 'react-router-dom'
import useKeyPressHook from '../utils/useKeyPressHook'

interface EndpointProps {
  path: string
  method: string
  data: MethodData
}

const colors: any = {
  'post': '#49cc90',
  'postBg': '#e8f6f0',
  'put': '#fca130',
  'putBg': '#fbf1e6',
  'get': '#61affe',
  'getBg': '#ebf3fb',
  'delete': '#f93e3e',
  'deleteBg': '#fbe7e7',
}

const getBackgroundColor = (method: string, deprecated: boolean) => {
  if (deprecated) {
    return '#f5f5f5'
  }
  return colors[`${method}Bg`]
}

const getBaseColor = (method: string, deprecated: boolean) => {
  if (deprecated) {
    return '#d9d9d9'
  }
  return colors[method]
}

const Endpoint = (props: EndpointProps) => {
  const [open, setOpen] = useState(false)
  const { method, path, data } = props
  const navigate = useNavigate()
  const id = `${data.tags[0]}/${data.operationId}`
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hash = window.location.hash
    const urlSplit = hash.split('/')
    if (urlSplit.length === 3) {
      const tag = urlSplit[1]
      const endpoint = urlSplit[2]
      if (tag === data.tags[0] && endpoint === data.operationId) {
        setOpen(true)
      }
    }
  }, [])

  const handleOpen = () => {
    setOpen(!open)
    navigate(!open ? `/#/${id}` : '/#/', { replace: true })
  }
  useKeyPressHook(['Enter'], handleOpen, ref)

  return (
    <div
      className={`mb-[10px] rounded ${data.deprecated ? 'opacity-60' : ''}`}
      style={{ background: getBackgroundColor(method, data.deprecated), border: `1px solid ${getBaseColor(method, data.deprecated)}` }}
      data-cy='endpoint'
    >
      <div
        className={`cursor-pointer flex items-center w-full p-[5px] gap-2 `}
        onClick={handleOpen}
        tabIndex={0}
        id={id}
        ref={ref}
      > 
        <div
          className={`min-w-[80px] py-[2px] rounded text-center text-white font-bold text-md uppercase`}
          style={{ background: getBaseColor(method, data.deprecated) }}
        >
          {method}
        </div>
        <div className={`font-medium ${data.deprecated ? 'line-through' : ''}`}>{path}</div>
        <div className='text-xs'>{data.summary}</div>
        <KeyboardArrowDownIcon className={`transform ${open ? 'rotate-180' : ''} ml-auto`} />
      </div>
      <Collapse className='w-full' in={open}>
        <ParametersSection method={method} parameters={data.parameters} deprecated={data.deprecated} />
        <ResponsesSection method={method} responses={data.responses} deprecated={data.deprecated} />
      </Collapse>
    </div>
  )
}

interface ParametersSectionProps {
  method: string
  parameters: ParametersData[]
  deprecated: boolean
}

const ParametersSection = (props: ParametersSectionProps) => {
  const { method, parameters, deprecated } = props
  return (
    <>
      <div className='p-[15px] bg-white border-y-[1px] border-gray-400 font-semibold'>
        Parameters
      </div>
      <div className='p-[15px]' style={{ background: getBackgroundColor(method, deprecated) }}>
        <Table headers={['Name', 'Description']}>
          {parameters.map((param, i) => (
            <tr key={`${param.name}-${i}`}>
              <TableData>
                <div className={`mr-3 ${param.required ? 'font-bold' : 'font-normal'}`}>
                  {param.name}
                  {param.required ? <span className='text-red-500'>*</span> : null}
                </div>
                <div className='text-[12px] font-semibold'>
                  {param.type}
                </div>
                <div className='text-[12px] text-gray-500 italic font-mono'>
                  ({param.in})
                </div>
              </TableData>
              <TableData>
                {param.description}
              </TableData>
            </tr>
          ))}
        </Table>
      </div>
    </>
  )
}

interface ResponsesSectionProps {
  responses: ResponsesData
  method: string,
  deprecated: boolean
}

const ResponsesSection = (props: ResponsesSectionProps) => {
  const { responses, method, deprecated } = props
  return (
    <>
      <div className='p-[15px] bg-white border-y-[1px] border-gray-400 font-semibold'>
        Responses
      </div>
      <div className='p-[15px]' style={{ background: getBackgroundColor(method, deprecated) }}>
        <Table headers={['Code', 'Description']}>
          {Object.keys(responses).map((code, i) => {
            const response = responses[code]
            return (
              <tr key={`${code}-${i}`}>
                <TableData>
                  <div className='mr-3'>
                    {code}
                  </div>
                </TableData>
                <TableData>
                  {response.description}
                </TableData>
              </tr>
            )
          })}
        </Table>
      </div>
    </>
  )
}
export default Endpoint;
