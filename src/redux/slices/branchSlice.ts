import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranchById
} from "../../services/branch.service";
import type { Branch } from "../../services/branch.service";

interface BranchState {
  items: Branch[];
  selectedBranch: Branch | null;
  loading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  items: [],
  selectedBranch: null,
  loading: false,
  error: null,
};

export const fetchBranches = createAsyncThunk(
  "branches/fetchBranches",
  async () => {
    const response = await getAllBranches();
    return response;
  }
);

export const fetchBranchById = createAsyncThunk(
  "branches/fetchBranchById",
  async (id: string) => {
    const response = await getBranchById(id);
    return response;
  }
);

export const addBranch = createAsyncThunk(
  "branches/addBranch",
  async (branch: {
    brand_id: string;
    address: string;
    phone: string;
    status: string;
  }) => {
    const response = await createBranch(branch);
    return response;
  }
);

export const editBranch = createAsyncThunk(
  "branches/editBranch",
  async ({ id, branch }: {
    id: string;
    branch: {
      brand_id?: string;
      address?: string;
      phone?: string;
      status?: string;
    }
  }) => {
    const response = await updateBranch(id, branch);
    return response;
  }
);

export const removeBranch = createAsyncThunk(
  "branches/removeBranch",
  async (id: string) => {
    await deleteBranchById(id);
    return id;
  }
);

const branchSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all branches
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchBranches.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch branches";
      })

      // Fetch branch by ID
      .addCase(fetchBranchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranchById.fulfilled, (state, action) => {
        state.selectedBranch = action.payload;
        state.loading = false;
      })
      .addCase(fetchBranchById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch branch";
      })

      // Add branch
      .addCase(addBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBranch.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addBranch.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add branch";
      })

      // Edit branch
      .addCase(editBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBranch.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.selectedBranch = action.payload;
        state.loading = false;
      })
      .addCase(editBranch.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to update branch";
      })

      // Remove branch
      .addCase(removeBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBranch.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(removeBranch.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to delete branch";
      });
  },
});

export default branchSlice.reducer;
