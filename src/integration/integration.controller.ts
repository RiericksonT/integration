import { Body, Controller, Get, Post } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrelloEventDTO } from 'src/trello/interface/IWebhookResponse';

@ApiTags('Integration')
@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  //The endpoint responsible for receiving the trello webhook information
  @Post('v1/sync')
  @ApiOperation({
    summary: 'Recebe o chamado do webhook do trello e cria um ticket no SDM',
  })
  @ApiResponse({ status: 201, description: 'Ticket criado com sucesso.' })
  async sync(@Body() body: TrelloEventDTO) {
    console.log('sync: ', JSON.stringify(body));
    return await this.integrationService.sync(body);
  }

  @ApiOperation({
    summary: 'Endpoint para criação do webhook do trello',
  })
  //Required endpoint to create a webhook on trello
  @Get('v1/sync')
  getSync() {
    console.log('getSync');
    return;
  }
}
