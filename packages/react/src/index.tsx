import * as React from 'react'
import * as common from 'schema-based-json-editor'
export * from 'schema-based-json-editor'
import { UploadContext, UploadOptions } from './context'
import { Editor } from './editor'

/**
 * @public
 */
export interface Props {
  schema: common.Schema;
  initialValue: common.ValueType;
  updateValue: (value: common.ValueType | undefined, isValid: boolean) => void;
  theme?: string;
  icon?: string;
  locale?: common.Locale | null;
  readonly?: boolean;
  dragula?: common.Dragula;
  markdownit?: any;
  hljs?: common.HLJS;
  forceHttps?: boolean;
  disableCollapse?: boolean;
  noSelect2?: boolean;
  minItemCountIfNeedFilter?: number;
  monacoEditor?: common.MonacoEditor;
  uploadOptions?: UploadOptions;
}

/**
 * @public
 */
export class JSONEditor extends React.Component<Props, unknown> {
  static defaultProps = {
    uploadOptions: {}
  }
  private md?: any
  constructor(props: Props) {
    super(props)
    this.md = common.initializeMarkdown(this.props.markdownit, this.props.hljs, this.props.forceHttps)
  }
  private getReference = (name: string) => {
    if (this.props.schema.definitions) {
      return this.props.schema.definitions[name.substring('#/definitions/'.length)]
    }
    return undefined
  }
  render() {
    const theme = common.getTheme(this.props.theme)
    const locale = common.getLocale(this.props.locale)
    const icon = common.getIcon(this.props.icon, locale)
    return (
      <UploadContext.Provider value={this.props.uploadOptions!}>
        <Editor
          schema={this.props.schema}
          initialValue={this.props.initialValue}
          updateValue={this.updateValue}
          getReference={this.getReference}
          readonly={this.props.readonly}
          theme={theme}
          locale={locale}
          icon={icon}
          required={true}
          dragula={this.props.dragula}
          md={this.md}
          hljs={this.props.hljs}
          forceHttps={this.props.forceHttps}
          disableCollapse={this.props.disableCollapse}
          noSelect2={this.props.noSelect2}
          minItemCountIfNeedFilter={this.props.minItemCountIfNeedFilter}
          monacoEditor={this.props.monacoEditor}
        />
      </UploadContext.Provider>
    )
  }
  private updateValue = (value: any, isValid: boolean) => {
    this.props.updateValue(value, isValid)
  }
}
