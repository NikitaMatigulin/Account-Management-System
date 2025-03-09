<template>
  <div class="account-manager">
    <div class="header">
      <h1>Учетные записи</h1>
      <el-button type="primary" plain @click="store.addAccount"> + </el-button>
    </div>

    <div class="info-banner">
      <el-icon><QuestionFilled /></el-icon>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>

    <div class="accounts-list">
      <el-empty v-if="!store.accounts.length" description="Нет учетных записей" />
      <div v-else v-for="account in store.accounts" :key="account.id" class="account-item">
        <div class="form-row">
          <div class="form-group">
            <div class="form-label">Метки</div>
            <el-input
              :model-value="getLabelsString(account.labels)"
              @update:model-value="
                (val) => {
                  account.labels = val
                }
              "
              placeholder="Введите метки через ; (например: метка1; метка2)"
              @blur="handleLabelsUpdate(account)"
              :maxlength="50"
            />
          </div>

          <div class="form-group">
            <div class="form-label">Тип записи</div>
            <el-select
              v-model="account.type"
              @change="handleTypeChange(account)"
              placeholder="Выберите тип"
            >
              <el-option label="LDAP" value="LDAP" />
              <el-option label="Локальная" value="Локальная" />
            </el-select>
          </div>

          <div class="form-group">
            <div class="form-label">Логин</div>
            <el-input
              v-model="account.login"
              placeholder="Значение"
              :maxlength="100"
              @blur="validateAccount(account)"
              :class="{ 'is-error': validation[account.id]?.login }"
            />
          </div>

          <div class="form-group" v-if="account.type === 'Локальная'">
            <div class="form-label">Пароль</div>
            <el-input
              v-model="account.password"
              type="password"
              placeholder="Значение"
              :maxlength="100"
              @blur="validateAccount(account)"
              show-password
              :class="{ 'is-error': validation[account.id]?.password }"
            />
          </div>

          <div class="form-group delete-button">
            <el-popconfirm
              title="Вы уверены, что хотите удалить эту учетную запись?"
              @confirm="store.deleteAccount(account.id)"
              confirm-button-text="Да"
              cancel-button-text="Нет"
            >
              <template #reference>
                <el-button type="danger" plain>
                  <el-icon><Delete /></el-icon>
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Delete, User, Lock, QuestionFilled } from '@element-plus/icons-vue'
import { useAccountsStore } from '../stores/accounts'
import type { Account, AccountLabel, AccountErrors } from '../types/account'
import { ElMessage } from 'element-plus'

const store = useAccountsStore()
const validation = ref<AccountErrors>({})

function getLabelsString(labels: AccountLabel[] | string): string {
  if (typeof labels === 'string') return labels
  return labels.map((label) => label.text).join('; ')
}

function handleLabelsUpdate(account: Account) {
  try {
    if (typeof account.labels === 'string') {
      const labels = account.labels
        .split(';')
        .map((label) => label.trim())
        .filter((label) => label)
        .map((label) => ({ text: label }))

      account.labels = labels
      store.updateAccount(account)
      ElMessage({
        message: 'Метки обновлены',
        type: 'success',
      })
    }
  } catch (error) {
    console.error('Ошибка при обновлении меток:', error)
    ElMessage.error('Не удалось обновить метки')
  }
}

function handleTypeChange(account: Account) {
  try {
    if (account.type === 'LDAP') {
      account.password = null
    } else {
      account.password = ''
    }
    store.updateAccount(account)
    validateAccount(account)
  } catch (error) {
    console.error('Ошибка при изменении типа:', error)
    ElMessage.error('Не удалось изменить тип учетной записи')
  }
}

function validateAccount(account: Account) {
  try {
    const isValid = {
      login: account.login.length > 0,
      password: account.type === 'LDAP' || (account.password?.length ?? 0) > 0,
    }

    validation.value[account.id] = isValid

    if (isValid.login && isValid.password) {
      if (typeof account.labels === 'string' && account.labels.trim()) {
        handleLabelsUpdate(account)
      }
      store.updateAccount(account)
      ElMessage({
        message: 'Учетная запись сохранена',
        type: 'success',
      })
    } else {
      ElMessage({
        message: 'Заполните обязательные поля',
        type: 'warning',
      })
    }
  } catch (error) {
    console.error('Ошибка при валидации:', error)
    ElMessage.error('Не удалось сохранить учетную запись')
  }
}
</script>

<style scoped>
.account-manager {
  padding: 1rem 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.header h1 {
  font-size: 1.125rem;
  font-weight: 400;
  color: #000;
  margin: 0;
}

.info-banner {
  background-color: #f5f7fa;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #606266;
  font-size: 0.875rem;
}

.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.form-group {
  flex: 1;
  min-width: 0;
}

.form-group.delete-button {
  flex: 0 0 auto;
  padding-top: 22px;
}

.form-label {
  font-size: 0.875rem;
  color: #606266;
  margin-bottom: 0.25rem;
}

:deep(.el-input__wrapper),
:deep(.el-select .el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset !important;
  border-radius: 4px;
}

:deep(.el-input__wrapper.is-focus),
:deep(.el-select .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff inset !important;
}

:deep(.el-input__wrapper.is-error) {
  box-shadow: 0 0 0 1px #f56c6c inset !important;
}

:deep(.el-button) {
  border-radius: 4px;
}

:deep(.el-button--primary) {
  --el-button-bg-color: #fff;
  --el-button-border-color: #dcdfe6;
  --el-button-text-color: #606266;
  --el-button-hover-text-color: #409eff;
  --el-button-hover-border-color: #409eff;
  --el-button-hover-bg-color: #fff;
  --el-button-active-text-color: #409eff;
  font-weight: normal;
}

:deep(.el-button--danger) {
  --el-button-bg-color: #fff;
  --el-button-border-color: #dcdfe6;
  --el-button-text-color: #606266;
  --el-button-hover-text-color: #f56c6c;
  --el-button-hover-border-color: #f56c6c;
  --el-button-hover-bg-color: #fff;
  --el-button-active-text-color: #f56c6c;
  padding: 8px 11px;
}

:deep(.el-select) {
  width: 100%;
}

@media (max-width: 1024px) {
  .form-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group.delete-button {
    padding-top: 0;
  }
}
</style>
