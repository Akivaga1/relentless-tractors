# CMS setup

The website remains a static site; Supabase supplies the shared database, approved-admin authentication, and image storage. No service-role key belongs in this repository or in browser code.

## Connect Supabase

1. Create a Supabase project and open its SQL Editor.
2. Run [`supabase-setup.sql`](./supabase-setup.sql) once. It creates the CMS tables, row-level security policies, the public media bucket, and starts CMS publishing in the off state.
3. In Supabase **Authentication → Users**, create the first admin account with the desired email and password. Turn off public sign-ups in the Supabase Auth settings.
4. Copy that account's user ID, then approve it in the SQL Editor:

   ```sql
   insert into public.cms_admins (user_id)
   values ('PASTE-THE-AUTH-USER-UUID-HERE');
   ```

   Repeat for each trusted administrator. Approval is enforced by database policies as well as by the admin sign-in screen.

5. In **Project Settings → API**, copy the Project URL and the **anon/public** key into [`assets/js/supabase-config.js`](./assets/js/supabase-config.js). The anon key is intended for public browser use; never put a `service_role` key in this site.
6. Deploy the site over HTTPS, open `/admin.html`, and sign in. Choose **Import website starter content** to copy the current inventory, guides, and gallery into Supabase and publish them. Existing content IDs are not overwritten by the import.

## Using the CMS

- **Inventory:** create and edit machinery, specifications, categories, photos, visibility, order, and homepage featured items.
- **Articles:** write and edit buying guides, summaries, cover images, display order, and HTML-formatted article bodies. The public site strips scripts, unsafe elements, and unsafe links from article markup.
- **Gallery:** manage captions, image order, and visibility. Images can be uploaded from the editor (up to 5 MB; JPEG, PNG, WebP, or GIF) or referenced by URL.
- **Publishing:** drafts are visible only to approved admins. The overview switch can enable or disable CMS content on the public site; with publishing off, the built-in site content is shown.

If an editor account cannot access content, verify that its Auth user ID is present in `cms_admins`. The anon key is public by design; never expose a service-role key. If a service-role key is ever exposed, rotate it immediately in Supabase.
