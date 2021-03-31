
export default function useCurrentUser(initialResource) {
   return initialResource.user.read();
}
