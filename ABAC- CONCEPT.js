// ABAC- CONCEPT
//
// ABAC ka basic formula
// ABAC decision ko is formula se samjho:
//
// Subject + Resource + Action + Environment
//
// System in sabke attributes dekhta hai.
//
// 1. Subject
// Subject matlab jo request kar raha hai.
// Usually:
//
// logged-in user
//
// User ke attributes ho sakte hain:
//
// user.id
// user.department
// user.designation
// user.location
// user.clearance_level
// user.employment_type
// user.is_manager
//
// Example:
//
// User:
// name = Om
// department = Engineering
// clearance_level = 3
// employment_type = Full-time
//
// ——————————————————————————————————————————————————————————————————————————
//
// 2. Resource
// Resource matlab jis cheez par action perform ho raha hai.
// Tumhare Notes project mein resource hai:
//
// Note
//
// Note ke attributes ho sakte hain:
//
// note.created_by
// note.department
// note.visibility
// note.status
// note.sensitivity_level
//
// Example:
//
// Note:
// created_by = Rahul
// department = Engineering
// visibility = Department
// status = Draft
// sensitivity_level = 2
//
// ——————————————————————————————————————————————————————————————————————————
//
// 3. Action
// Action matlab user kya karna chahta hai.
// Examples:
//
// view
// create
// update
// delete
// publish
// archive
//
// Request:
//
// PATCH /api/notes/10/
//
// Action:
//
// update
//
// ——————————————————————————————————————————————————————————————————————————
//
// 4. Environment
// Environment matlab request kis context mein ho rahi hai.
// Attributes:
//
// current_time
// current_day
// IP address
// user location
// device
// network
// authentication method
//
// Example:
//
// current_time = 11:00 AM
// network = company_network
// location = India
//
// Environment optional nahi hai conceptually, but har project mein use karna necessary bhi nahi hai.
//
// ——————————————————————————————————————————————————————————————————————————
//
// Complete example
// Maan lo user hai:
//
// Om
// department = Engineering
// clearance_level = 3
//
// Note hai:
//
// department = Engineering
// sensitivity_level = 2
// status = Draft
// created_by = Rahul
//
// Action:
//
// update
//
// Policy:
//
// Allow update if:
//
// user.department == note.department
// AND
// user.clearance_level >= note.sensitivity_level
// AND
// note.status != archived
//
// Evaluation:
//
// Engineering == Engineering → True
// 3 >= 2 → True
// Draft != Archived → True
//
// Final result:
//
// True AND True AND True
// → Allow
//
// ——————————————————————————————————————————————————————————————————————————
//
// Dusra example
// User:
//
// department = Sales
// clearance_level = 1
//
// Note:
//
// department = Engineering
// sensitivity_level = 2
//
// Policy same hai:
//
// user.department == note.department
// AND
// user.clearance_level >= note.sensitivity_level
//
// Check:
//
// Sales == Engineering → False
// 1 >= 2 → False
//
// Final:
//
// Deny
//
// User ka role Editor ho sakta hai, lekin attributes match nahi hue.
//
// ——————————————————————————————————————————————————————————————————————————
//
// Main difference: RBAC vs ABAC
// RBAC
// Question:
//
// User ka role kya hai?
//
// Example:
//
// Is user an Editor?
//
// Decision:
//
// Editor can update notes
//
// ABAC
// Question:
//
// User ke attributes resource aur context se match karte hain?
//
// Decision:
//
// User note update kar sakta hai only if:
//
// same department
// sufficient clearance
// note archived nahi hai
//
// ——————————————————————————————————————————————————————————————————————————
//
// ABAC mein policy kya hoti hai?
//
// Policy ek rule hoti hai jo decide karti hai access allow hai ya deny.
// Example:
//
// Employees can view notes from their own department.
//
// Isko technical form mein:
//
// Allow view when:
//
// user.department == note.department
//
// Another policy:
//
// Managers can publish notes of their department.
//
// Technical form:
//
// Allow publish when:
//
// user.is_manager == True
// AND
// user.department == note.department
//
// Another:
//
// Contractors cannot delete notes.
//
// Technical form:
//
// Deny delete when:
//
// user.employment_type == contractor
//
// Allow policies aur deny policies
// ABAC mein policies do types ki ho sakti hain.
// Allow policy
//
// Allow if user owns the resource
//
// Example:
//
// user.id == note.created_by_id
//
// Deny policy
//
// Deny if note is archived
//
// Example:
//
// note.status == "archived"
//
// Maan lo dono policies match ho rahi hain:
//
// User owns note → Allow
// Note archived hai → Deny
//
// Usually secure systems mein:
//
// Explicit Deny wins
//
// Matlab:
//
// Final decision = Deny
//
// Ye important ABAC concept hai.
