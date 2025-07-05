import supabase from '../supabaseClient';

export async function fetchAllGoals(userId: string) {
    const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', userId);
    if (error) throw error;
    return data;
}

export async function fetchGoalById(id: string) {
    const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('id', id)
        .single();
    if (error) throw error;
    return data;
}

export async function createGoal(goal: any, userId: string) {
    console.log('userid', userId);
    const { data, error } = await supabase
        .from('goals')
        .insert([{ ...goal, user_id: userId }])
        .single();
    if (error) throw error;
    return data;
}

export async function editGoal(goal: any) {
    const { data, error } = await supabase
        .from('goals')
        .update({ name: goal.name, goal: goal.goal })
        .eq('id', goal.id)
        .single();
    if (error) throw error;
    return data;
}

export async function incrementProgress(id: string) {
    // Fetch current count
    const { data, error } = await supabase
        .from('goals')
        .select('count')
        .eq('id', id)
        .single();

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

export async function decrementProgress(id: string) {
    // Fetch current count
    const { data, error } = await supabase
        .from('goals')
        .select('count')
        .eq('id', id)
        .single();

    if (error) throw error;

    const newCount = (data?.count ?? 0) - 1;

    // Update count
    const { data: updated, error: updateError } = await supabase
        .from('goals')
        .update({ count: newCount })
        .eq('id', id)
        .single();

    if (updateError) throw updateError;
    return updated;
}

export async function setProgress(id: string, count: number) {
    // Fetch current count
    const { error } = await supabase
        .from('goals')
        .select('count')
        .eq('id', id)
        .single();

    if (error) throw error;

    const newCount = count;

    // Update count
    const { data: updated, error: updateError } = await supabase
        .from('goals')
        .update({ count: newCount })
        .eq('id', id)
        .single();

    if (updateError) throw updateError;
    return updated;
}

export async function deleteGoal(id: string) {
    const { error } = await supabase.from('goals').delete().eq('id', id);
    if (error) throw error;
}
