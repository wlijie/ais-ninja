import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import {ChatGptConfig} from '@/types'
import {NotificationInfo} from '@/types/admin'

export interface ConfigState {
	// 配置信息
	config: ChatGptConfig
	// 模型
	models: Array<{
		label: string
		value: string
	}>
	// 配置弹窗开关
	configModal: boolean
	// 修改配置弹窗
	setConfigModal: (value: boolean) => void
	// 修改配置
	changeConfig: (config: ChatGptConfig) => void
	notifications: Array<NotificationInfo>
	shop_introduce: string
	user_introduce: string,
	invitee_reward: number,
	inviter_reward: number,
	login_methods?: string[],
	server_domain?: string,
	social?: {
		google: {
			client_id: string
		}
	}
	replaceData: (config: { [key: string]: any }) => void
}

const configStore = create<ConfigState>()(
	persist(
		(set, get) => ({
			configModal: false,
			notifications: [],
			shop_introduce: '',
			user_introduce: '',
			invitee_reward: 0,
			inviter_reward: 0,
			models: [],
			config: {
				model: 'gpt-3.5-turbo',
				temperature: 0,
				presence_penalty: 0,
				frequency_penalty: 0,
				max_tokens: 1888,
			},
			setConfigModal: (value) => set({configModal: value}),
			changeConfig: (config) =>
				set((state: ConfigState) => ({
					config: {...state.config, ...config}
				})),
			replaceData: (data) => set((state: ConfigState) => ({...state, ...data}))
		}),
		{
			name: 'config_storage', // name of item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
		}
	)
)

export default configStore
