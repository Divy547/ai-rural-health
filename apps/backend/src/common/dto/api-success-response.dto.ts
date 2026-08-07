import { ApiProperty } from '@nestjs/swagger';

export class ApiSuccessResponseDto<T> {
    @ApiProperty({
        example: true,
    })
    success!: boolean;

    @ApiProperty({
        example: 'Success',
    })
    message!: string;

    @ApiProperty({
        example: '2026-08-07T18:40:00.000Z',
    })
    timestamp!: string;

    @ApiProperty({
        example: '88c18c1f-5fd2-4b9d-93fb-f3dcb6f0fd7d',
    })
    requestId!: string;

    data!: T;
}