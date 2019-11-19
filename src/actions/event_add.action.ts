import { Injectable} from '@nestjs/common';

import { getEventDate, formatEventDate } from '../common/utils';
import { BaseAction, IDoActionParams, IActionResult } from './base.action';
import { Event } from 'src/storage/models/event';

@Injectable()
export class EventAddAction extends BaseAction {
    protected setEvent(): void {
        this.event = this.appEmitter.EVENT_ADD;
    }

    protected async doAction(params: IDoActionParams): Promise<IActionResult> {
        await this.storageService.markChatEventsInactive(params.chat.id);
        const eventDate: Date = getEventDate();
        const event: Event = await this.storageService.appendChatActiveEvent(params.chat, eventDate);

        return {
            status: this.STATUS_SUCCESS,
            data: {date: formatEventDate(event.date)},
        } as IActionResult;
    }
}