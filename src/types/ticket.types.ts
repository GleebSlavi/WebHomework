export interface ITicket {
    id: string;
    title: string;
    projectId: string;
    assignedTo?: string;
    description: string;
    createDate: Date;
    status: string;
}