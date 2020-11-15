import { from } from "rxjs";
import { Controller } from '@nestjs/common';
import { AccessService } from '../../service/access.service';
import { ADMIN } from '../../config/routerPrefix';

@Controller(ADMIN + '/access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}
}