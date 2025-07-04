import { supabase } from '../supabaseClient';

export async function fetchAllGoals() {
    const { data, error } = await supabase.from('goals').select('*');
    if (error) throw error;
    return data;
}

export async function fetchGoalById(id: string) {
    const { data, error } = await supabase.from('goals').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
}

export async function createGoal(goal: any) {
    const { data, error } = await supabase.from('goals').insert(goal).single();
    if (error) throw error;
    return data;
}

export async function incrementProgress(id: string) {
    // Fetch current count
    const { data, error } = await supabase.from('goals').select('count').eq('id', id).single();

    if (error) throw error;

    const newCount = (data?.count ?? 0) + 1;

    // Update count
    const { data: updated, error: updateError } = await supabase
        .from('goals')
        .update({ count: newCount })
        .eq('id', id)
        .single();

    if (updateError) throw updateError;
    return updated;
}

export async function deleteGoal(id: number) {
    const { error } = await supabase.from('goals').delete().eq('id', id);
    if (error) throw error;
}
