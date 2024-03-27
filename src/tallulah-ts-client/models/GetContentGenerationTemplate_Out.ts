/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { app__models__content_generation_template__ContentGenerationState } from './app__models__content_generation_template__ContentGenerationState';
import type { Context } from './Context';
import type { ParameterField } from './ParameterField';

export type GetContentGenerationTemplate_Out = {
    name: string;
    description?: string;
    parameters?: Array<ParameterField>;
    context?: Array<Context>;
    prompt: string;
    id: string;
    user_id: string;
    organization: string;
    creation_time: string;
    state: app__models__content_generation_template__ContentGenerationState;
};
