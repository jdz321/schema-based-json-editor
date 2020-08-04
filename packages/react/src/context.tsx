import React from 'react'
import { Props as UploaderProps } from 'file-uploader-react-component'
import { UploadCallbacks } from 'schema-based-json-editor'

export type UploadOptions = Pick<UploaderProps, 'accept' | 'method' | 'multiple' | 'name'> & UploadCallbacks

export const UploadContext = React.createContext<UploadOptions>({})
