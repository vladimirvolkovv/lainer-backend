export class NewUserDTO {
  name: string;
  email: string;
  password: string;
  roles?: string[];
  rentalObjects?: string[];
}
