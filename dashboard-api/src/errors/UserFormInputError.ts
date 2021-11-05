import { UserInputError } from "apollo-server-errors"

interface ExtraData<ArgsType> {
  field: keyof ArgsType
}

class UserFormInputError<ArgsType> extends UserInputError {
  constructor(message: string, extra: ExtraData<ArgsType>) {
    super(message, extra)
  }
}

export default UserFormInputError
