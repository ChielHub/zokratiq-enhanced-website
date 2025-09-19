# Contact Drawer Implementation Details

## Implementation Status: ✅ COMPLETE

The contact drawer has been fully implemented in `/app/partner-with-us/page.tsx` according to the provided spec.

## Key Features Implemented:

### Identity Toggle (Step 0)
- ✅ Segmented control: "A team/institution" vs "An independent ally/consultant"  
- ✅ Required field with validation
- ✅ Shows relevant field groups based on selection
- ✅ Help text: "Pick the lane that fits today. We can always switch later."

### Shared Core Fields
- ✅ Full name (required, 2-80 chars)
- ✅ Email (required, standard validation)
- ✅ Location (optional, freeform)
- ✅ Preferred next step (radio buttons, required, defaults to "30-min exploration call")

### Organization Path (when "team/institution" selected)
- ✅ Organization name (required)
- ✅ Your role (required)
- ✅ Partnership types (multi-select checkboxes)
- ✅ Frontier question (required textarea with help text)
- ✅ Timeline (required radio buttons)

### Independent Path (when "independent ally" selected)  
- ✅ Practice/focus (required)
- ✅ Edge in one line (required, 160 char limit)
- ✅ Collaboration modes (multi-select checkboxes)
- ✅ Texture question (required textarea, 1200 char limit)
- ✅ Availability (required radio buttons)

### Form Behavior
- ✅ Progressive disclosure based on identity selection
- ✅ Comprehensive validation with inline error messages
- ✅ Loading state: "Mapping your thread of interest…"
- ✅ Success state with different messages per path
- ✅ Consent checkbox (required)
- ✅ Privacy note included
- ✅ Character limits enforced

### UI/UX
- ✅ Smooth drawer animation under hero section
- ✅ Backdrop blur overlay
- ✅ Responsive design
- ✅ Keyboard-friendly navigation
- ✅ Zokratiq brand styling (teal/aqua colors)
- ✅ All microcopy from spec ("jagged edges to smooth bios", etc.)

### Triggers
- ✅ Both "Start the Conversation" buttons open the drawer
- ✅ Hero CTA button
- ✅ Final section CTA button

## Form Data Structure
The form outputs JSON matching the routing spec provided, with proper tagging for:
- `source: "partner-with-us"`
- `identity: "organization" | "independent"`
- Separate org/independent data objects
- Meta fields (referral, notes, consent, timestamp)

## Next Steps After Build
1. Form currently simulates submission - needs backend integration
2. "Grab a 30-min slot" button needs scheduler integration
3. Email links work but could be enhanced with pre-filled data

## Testing After Build
- Navigate to `/partner-with-us/`
- Click "Start the Conversation"
- Test both organization and independent paths
- Verify validation and success states