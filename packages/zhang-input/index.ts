import Input from "./src/index.vue"
import { withInstall } from "../withInstall"
const ZhangInput = withInstall(Input)
export default ZhangInput
export type ZhangInputInstance = InstanceType<typeof Input>
export * from './src/type'
