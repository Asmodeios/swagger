import parseHtmlString from '../utils/parseHtmlString'

interface InfoProps {
  description: string,
  version: string,
  title: string,
  termsOfService: string,
  contact: {
    email: string
  },
  license: {
    name: string,
    url: string
  }
}
const Info = (info: InfoProps) => {
  const transformedDescription = parseHtmlString(info.description)

  return (
    <div className='flex flex-col max-w-[1468px] mx-auto my-[50px]' data-cy='info'>
      <div className='text-4xl font-bold flex items-start' data-cy='title'>
        {info.title}
        <div className='bg-slate-500 text-white text-[14px] rounded-xl h-[22px] flex items-center p-[8px]'>{info.version}</div>
      </div>
      <div className='text-base py-2' dangerouslySetInnerHTML={{ __html: transformedDescription}} />
      <div data-cy='terms'>
        <a href={info.termsOfService} target='_blank' rel='noopener noreferrer'>Terms of service</a>
      </div>
      <div data-cy='contact'>
        <a href={`mailto:${info.contact.email}`} target='_blank' rel='noopener noreferrer'>Contact the developer</a>
      </div>
      <div data-cy='license'>
        <a href={info.license.url} target='_blank' rel='noopener noreferrer'>{info.license.name}</a>
      </div>
    </div>
  )
}

export default Info