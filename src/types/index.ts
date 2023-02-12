export type TagData = {
  name: string
  description: string
  externalDocs?: {
    description: string
    url: string
  }
}

export type PathData = {
  [name: string]: {
    [name: string]: MethodData
  }
}

export type MethodData = {
  tags: string[]
  summary: string
  description: string
  operationId: string
  consumes?: string[]
  produces?: string[]
  parameters: ParametersData[]
  responses: ResponsesData,
  deprecated: boolean
}

export type ParametersData = {
  in: string
  name: string
  description: string
  required: boolean,
  type: string
}

export type ResponsesData = {
  [name: string]: {
    description: string
  }
}