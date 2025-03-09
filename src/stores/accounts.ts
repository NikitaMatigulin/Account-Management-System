import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Account } from '@/types/account'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  // Загружаем данные при инициализации
  try {
    const savedAccounts = localStorage.getItem('accounts')
    if (savedAccounts) {
      accounts.value = JSON.parse(savedAccounts)
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
  }

  // Сохраняем изменения в localStorage
  watch(
    accounts,
    (newAccounts) => {
      try {
        localStorage.setItem('accounts', JSON.stringify(newAccounts))
      } catch (error) {
        console.error('Ошибка при сохранении данных:', error)
      }
    },
    { deep: true },
  )

  function addAccount() {
    const newAccount: Account = {
      id: crypto.randomUUID(),
      labels: [],
      type: 'Локальная',
      login: '',
      password: '',
    }
    accounts.value.push(newAccount)
    return newAccount
  }

  function updateAccount(updatedAccount: Account) {
    const index = accounts.value.findIndex((acc) => acc.id === updatedAccount.id)
    if (index !== -1) {
      accounts.value[index] = { ...updatedAccount }
    }
  }

  function deleteAccount(id: string) {
    accounts.value = accounts.value.filter((acc) => acc.id !== id)
  }

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
  }
})
