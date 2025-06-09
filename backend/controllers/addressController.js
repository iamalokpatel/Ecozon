import Address from "../models/Address.js";

export const getAllAddresses = async (req, res) => {
  try {
    const userId = req.user.id; // comes from auth middleware
    const addresses = await Address.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const addAddress = async (req, res) => {
  try {
    const userId = req.user._id; // Make sure `req.user` is set by auth middleware
    const { fullName, mobile, pincode, addressLine, city, state, landmark } =
      req.body;

    if (!fullName || !mobile || !pincode || !addressLine) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newAddress = new Address({
      user: userId,
      fullName,
      mobile,
      pincode,
      addressLine,
      city,
      state,
      landmark,
    });

    await newAddress.save();

    res
      .status(201)
      .json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.error("Add Address Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/// Get Addrss ByID

export const getAddressById = async (req, res) => {
  try {
    const addressId = req.params.id;

    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ address });
  } catch (error) {
    console.error("Error fetching address by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id; // authenticated user ID
    const addressId = req.params.id; // address ID from URL param
    const updateData = req.body;

    // Find the address and make sure it belongs to this user
    const address = await Address.findOne({ _id: addressId, user: userId });

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    // Update the fields
    Object.assign(address, updateData);

    // Save updated address
    await address.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteAddress = async (req, res) => {
  await Address.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.sendStatus(204);
};

export const setDefaultAddress = async (req, res) => {
  await Address.updateMany(
    { user: req.user.id },
    { $set: { isDefault: false } }
  );
  const address = await Address.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { $set: { isDefault: true } },
    { new: true }
  );
  res.json(address);
};
