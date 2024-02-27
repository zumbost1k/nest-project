import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  //описание эндпоинта
  @ApiOperation({ summary: 'role creation' })
  //описание типа возвращаемой информации
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  //описание эндпоинта
  @ApiOperation({ summary: 'role description' })
  //описание типа возвращаемой информации
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getOne(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
