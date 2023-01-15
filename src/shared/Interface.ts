export interface typeToken {
    token: string,
    refreshToken: string
}

export interface typeUser {
    Id?: number
    name: string
    phone: string
    address: string
    imagePath?: string
    isCustomerCreated?: boolean
    point?: number
    createdAt?: string
    updatedAt?: string
    customerTypeId: number
    birthday?: string
    gender?: boolean
    isDeleted?: boolean
    imageName?: any
    customerType: typeCustomer
    iat?: number
    exp?: number
    Token: typeToken
    statusBooking: boolean
}

export interface typeCustomer {
    Id?: number
    name?: string
    percent: number
    description?: any
    createdAt?: string
    updatedAt?: string
    isDeleted?: boolean
}

export interface ServiceType {
    Id: number
    name: string
    isDeleted: boolean
    services: Service[]
}

export interface Service {
    Id: number
    price: number
    name: string
    imagePath?: string
    serviceTypeId: number
    description?: string
    createdAt?: string
    updatedAt?: string
    isDeleted?: boolean
    imageName?: string
}

export interface Staff {
    Id: number
    name: string
    phone: string
    address: string
    basicWage?: number
    imageName?: string
    imagePath?: string
    birthday?: string
    gender?: boolean
    description?: string
    roleId?: number
    role?: Role
    departmentId?: number
    department?: Department
    wages?: Wage[]
    isDeleted?: boolean
    bookings?: Booking[]
    bills?: Bill[]
    _count: Count
    avg?: string
}

export interface Role {
    Id?: number
    name?: string
    isDeleted?: boolean
}

export interface Department {
    Id?: number
    name?: string
    managerId?: number
    isDeleted?: boolean
}

export interface Wage {
    Id?: number
    staffId?: number
    month?: number
    wage?: number
    year?: number
    totalBills?: number
    bonusPerBill?: number
}

export interface Booking {
    Id?: number
    date?: string
    timeSlot?: string
    note?: string
    status?: string
    createdAt?: string
    updatedAt?: string
    createdBy?: any
    staffId?: number
    customerId?: number
    updatedBy?: number
    isDeleted?: boolean
    advertisementId?: number
    rate?: Rate
    staff: Staff
    customer: Customer
    advertisement?: Advertisement
    details: Detail[]
}

export interface Detail {
    Id: number
    bookingId: number
    serviceId: number
    billId: any
    service: Service
    bill: any
}
export interface Customer {
    Id: number
    name: string
    phone: string
    address: string
    imageName: any
    imagePath: string
    birthday: string
    gender: boolean
    customerTypeId: number
    customerType: CustomerType
    rates: Rate2[]
    isDeleted: boolean
}

export interface CustomerType {
    Id: number
    name: string
    percent: number
    description: any
    createdAt: string
    updatedAt: string
    isDeleted: boolean
}

export interface Rate2 {
    Id: number
    rate: number
    comment: string
    createdAt: string
    customerId: number
    bookingId: number
}
export interface Rate {
    Id: number
    rate: number
    comment: string
    createdAt: string
    customerId: number
    bookingId: number
}

export interface Bill {
    Id: number
    price?: number
    createdAt?: string
    updatedAt?: string
    createdBy?: number
    staffId: number
    customerId?: number
    bookingId?: number
}

export interface Count {
    bills?: number
    bookings?: number
    wages?: number
}

export interface Advertisement {
    Id: number
    title: string
    detail: string
    imageName?: string
    imagePath: string
    discount: number
    endDate: string
    startDate: string
    voucherCode: string
    amount: number
    isDeleted: boolean
}

export interface Account {
    phone: string,
    pass: string,
    remember: boolean
}

export interface RankingStylist {
    _count: number
    staffId: number
    staff: Staff
}
