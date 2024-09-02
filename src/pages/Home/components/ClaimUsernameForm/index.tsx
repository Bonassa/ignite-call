import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, TextInput, Text } from '@ignite-ui/react'

import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Mínimo de 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Usuário apenas com letras e hífen' })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormType = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormType>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormType) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuário"
        {...register('username')}
      />
      <Button size="sm" type="submit" disabled={isSubmitting}>
        Reservar
        <ArrowRight />
      </Button>

      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </Form>
  )
}
