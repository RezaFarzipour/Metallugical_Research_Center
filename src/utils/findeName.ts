type User = {
    username: string;
    first_name: string;
    last_name: string
};
type Service = {
    id: string;
    service_name
    : string;
};



export function findName(userData: User[], username: string): string {
    const user = userData.find((user) => user.username == username);
    return user ? `${user.first_name} ${user.last_name}` : "نامشخص";
}
export function findServiceName(serviceData: Service[], serviceId: string): string {
    return serviceData.find(service => String(service.id) === serviceId)?.service_name
        ?? "نامشخص";
}
