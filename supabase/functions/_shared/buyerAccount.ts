type BuyerAuth = {
  admin: {listUsers(options: {page: number; perPage: number}): Promise<{data: {users: {id: string; email?: string}[]} | null; error: unknown}>};
  resetPasswordForEmail(email: string, options: {redirectTo: string}): Promise<{error: unknown}>;
};

/** Read-only lookup must not generate a token or consume the email-send cooldown. */
export async function sendExistingBuyerSetup(auth: BuyerAuth, email: string, redirectTo: string): Promise<string> {
  const checkoutEmail = email.trim().toLowerCase();
  for (let page = 1; ; page++) {
    const {data, error} = await auth.admin.listUsers({page, perPage: 1000});
    if (error) throw error;
    const users = data?.users ?? [];
    const buyer = users.find(user => user.email?.toLowerCase() === checkoutEmail);
    if (buyer) {
      const sent = await auth.resetPasswordForEmail(checkoutEmail, {redirectTo});
      if (sent.error) throw sent.error;
      return buyer.id;
    }
    if (users.length < 1000) throw new Error('existing_user_missing');
  }
}
