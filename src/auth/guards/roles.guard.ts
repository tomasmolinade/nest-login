import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    // console.log("Requiered Roles: ",requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const role = request.sessionInfo.role;

    // console.log("Role: ", role)
    let status = false;
    
    requiredRoles.forEach(r => {
        if (r == role) status = true;
    });

    return status;
  }
}
