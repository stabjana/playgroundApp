import {
  Controller,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { PlaygroundService } from './playground.service';
import { Playground } from './playground.service';

@Controller('playgrounds')
export class PlaygroundController {
  constructor(
    private readonly playgroundService: PlaygroundService,
  ) {}

  @Get()
  getAll(): Playground[] {
    return this.playgroundService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Playground {
    const playground = this.playgroundService.getOne(id);
    if (!playground) {
      throw new NotFoundException(
        `Playground with id ${id} not found`,
      );
    }
    return playground;
  }
}
