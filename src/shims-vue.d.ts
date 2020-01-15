declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface ApiResponse<T> {
  code: number,
  data: T,
  message: string
}

interface UserInfo {
  id: string,
  name: string,
  avatar_url: string,
  location?: string
}
