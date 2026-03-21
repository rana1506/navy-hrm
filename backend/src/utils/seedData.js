import bcrypt from 'bcryptjs';
import Role from '../models/Role.js';
import Department from '../models/Department.js';
import Division from '../models/Division.js';
import User from '../models/User.js';
import { SYSTEM_ROLES } from '../config/roles.js';
import { DEPARTMENTS } from '../config/departments.js';
import { DEFAULT_DIVISIONS } from '../config/divisions.js';
import { ALL_RANKS, OFFICER_RANKS, SAILOR_RANKS } from '../config/ranks.js';

export async function runSeed() {
  // Roles
  for (const r of SYSTEM_ROLES) {
    await Role.updateOne({ name: r }, { name: r }, { upsert: true });
  }

  // Departments
  for (const d of DEPARTMENTS) {
    await Department.updateOne({ key: d.key }, d, { upsert: true });
  }

  // Divisions
  for (const d of DEFAULT_DIVISIONS) {
    await Division.updateOne({ code: d.code }, d, { upsert: true });
  }

  const pwd = await bcrypt.hash('Password@123', 10);

  const mkUser = async (u) => {
    const exists = await User.findOne({ email: u.email });
    if (exists) return exists;
    const user = new User({
      serviceNo: u.serviceNo,
      rank: u.rank,
      name: u.name,
      email: u.email,
      passwordHash: pwd,
      roles: u.roles || [],
      isOfficer: u.isOfficer || false,
      isSailor: u.isSailor || false,
      status: 'active'
    });
    await user.save();
    return user;
  };

  const admin = await mkUser({ serviceNo: 'ADM0001', rank: 'Captain', name: 'Admin', email: 'admin@navy.mil', roles: ['ADMIN'], isOfficer: true });
  const co = await mkUser({ serviceNo: 'CO0001', rank: 'Captain', name: 'Commanding Officer', email: 'co@navy.mil', roles: ['CO'], isOfficer: true });
  const xo = await mkUser({ serviceNo: 'XO0001', rank: 'Commander', name: 'Executive Officer', email: 'xo@navy.mil', roles: ['XO'], isOfficer: true });
  const go = await mkUser({ serviceNo: 'GO0001', rank: 'Lieutenant Commander', name: 'Gunnery Officer', email: 'go@navy.mil', roles: ['GO'], isOfficer: true });
  const ro = await mkUser({ serviceNo: 'RO0001', rank: 'Lieutenant', name: 'Regulating Officer', email: 'ro@navy.mil', roles: ['RO'], isOfficer: true });
  const eo = await mkUser({ serviceNo: 'EO0001', rank: 'Commander', name: 'Engineering Officer', email: 'eo@navy.mil', roles: ['EO'], isOfficer: true });
  const lo = await mkUser({ serviceNo: 'LO0001', rank: 'Lieutenant Commander', name: 'Electrical Officer', email: 'lo@navy.mil', roles: ['LO'], isOfficer: true });
  const so = await mkUser({ serviceNo: 'SO0001', rank: 'Lieutenant Commander', name: 'Supply Officer', email: 'so@navy.mil', roles: ['SO'], isOfficer: true });
  const mo = await mkUser({ serviceNo: 'MO0001', rank: 'Lieutenant Commander', name: 'Medical Officer', email: 'mo@navy.mil', roles: ['MO'], isOfficer: true });

  // Assign HODs
  for (const d of DEPARTMENTS) {
    const dep = await Department.findOne({ key: d.key });
    let headUser = null;
    const role = d.headRole;
    const map = { XO: xo, EO: eo, LO: lo, SO: so, MO: mo };
    headUser = map[role]?._id || null;
    dep.headUser = headUser;
    await dep.save();
  }

  // DO user
  const doUser = await mkUser({ serviceNo: 'DO0001', rank: 'Lieutenant', name: 'Divisional Officer - Alpha', email: 'do-alpha@navy.mil', roles: ['DO'], isOfficer: true });

  // Link DO to Alpha division
  const alpha = await Division.findOne({ code: 'ALPHA' });
  alpha.divisionalOfficer = doUser._id;
  await alpha.save();

  // Sample Sailor
  const sailor = await mkUser({ serviceNo: 'SR0001', rank: 'Seaman', name: 'Sailor One', email: 'sr1@navy.mil', roles: ['SAILOR'], isSailor: true });

  // Assign sample sailor to department (Executive) and division (Alpha)
  const exec = await Department.findOne({ key: 'EXEC' });
  sailor.department = exec._id;
  sailor.division = alpha._id;
  await sailor.save();

  return { admin, co, xo, go, ro, eo, lo, so, mo, doUser, sailor };
}
