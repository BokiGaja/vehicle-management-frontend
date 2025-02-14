export const ROUTES = {
    HOME: '/',
    VEHICLE_DETAILS_PAGE: (slug?: string) => slug ? `/vehicles/${slug}` : '/vehicles/:slug',
    NEW_VEHICLE: '/vehicles/new',
    VEHICLE_EDIT: (slug?: string) => slug ? `/vehicles/${slug}/edit` : '/vehicles/:slug/edit'
}